from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError
from .models import DiseaseRecommendation, CoffeeLeafImage, ConfusionMatrix, ClassificationReport, CustomUser, CoffeeLeafForResearcher,CoffeleafDataSetModel
from .serializers import DiseaseRecommendationSerializer, CoffeeLeafImageUploadSerializer, CoffeeLeafTestedModelSerializer, CustomUserSerializer, CoffeeLeafForResearcherSerializer,CoffeeLeafTrainZipSerializer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.conf import settings
import os

from .ML_functions.test_model_function import test_model_function
from .ML_functions.train_model_functions import extract_zip, setup_data_generator, load_and_compile_model, train_model, save_model, generate_plot  # Import the ML utility functions

class ObtainAuthTokenView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "role": user.role,
                "email":user.email
            })
        else:
            return Response({"error": "Invalid credentials"}, status=400)

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response(
                {
                    "user": serializer.data,
                    "access_token": access_token,
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CoffeeLeafImageViewSet(viewsets.ModelViewSet):
    queryset = CoffeeLeafImage.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = CoffeeLeafImageUploadSerializer

class CoffeeLeafForResearcherViewSet(viewsets.ModelViewSet):
    queryset = CoffeeLeafForResearcher.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = CoffeeLeafForResearcherSerializer

class DiseaseRecommendationViewSet(viewsets.ModelViewSet):
    queryset = DiseaseRecommendation.objects.all()
    serializer_class = DiseaseRecommendationSerializer
    permission_classes = [AllowAny]


class CoffeeLeafDataSetViewSet(viewsets.ModelViewSet):
    queryset = CoffeleafDataSetModel.objects.all()
    permission_classes=[IsAuthenticated]
    def get_serializer_class(self):
            query_params = self.request.query_params  
            model_type = query_params.get("model_type") 
            if self.action in ['post','put','patch']:
                if model_type == 'train':
                    return CoffeeLeafTrainZipSerializer
                elif model_type == 'test':
                    return CoffeeLeafTestedModelSerializer
                else:
                        raise ValidationError("The 'model_type' parameter is required and must be 'test' or 'train'.")
            else:
                return CoffeeLeafTestedModelSerializer


    def perform_create(self, serializer):
        try:
            user = self.request.user
            model_file = self.request.FILES['model_file']
            query_params = self.request.query_params  
            model_type = query_params.get("model_type")  


            with transaction.atomic():
                dataset_model = serializer.save(uploader=user, model_file=model_file, model_type=model_type)

                if model_type == 'train':
                    trained_model_details = self.train_model_function(dataset_model.model_file.path, user)
                    dataset_model.accuracy = trained_model_details['accuracy']
                    dataset_model.loss = trained_model_details['loss']
                    dataset_model.cm_plot_url = trained_model_details['plot_url']
                elif model_type == 'test':
                    model_file_path = dataset_model.model_file.path
                    extract_to_dir = os.path.join(settings.MEDIA_ROOT, 'extracted_test_data')
                    os.makedirs(extract_to_dir, exist_ok=True)
                    model_path = os.path.join(settings.BASE_DIR, 'coffeleaf', 'ML_functions', 'final_code_updated.keras')

                    test_results = test_model_function(model_file_path, extract_to_dir, model_path)

                    dataset_model.loss = test_results['test_loss']
                    dataset_model.accuracy = test_results['test_acc']
                    dataset_model.cm_plot_url = test_results['cm_plot_url']

                    cm = test_results['cm']
                    for row in cm:
                        ConfusionMatrix.objects.create(
                            trained_model=dataset_model,
                            true_positive=row[0],
                            false_positive=row[1],
                            false_negative=row[2],
                            true_negative=row[3]
                        )

                    class_report = test_results['class_report']
                    for class_name, report in class_report.items():
                        if isinstance(report, dict):
                            ClassificationReport.objects.create(
                                trained_model=dataset_model,
                                precision=report['precision'],
                                recall=report['recall'],
                                f1_score=report['f1-score'],
                                support=report['support']
                            )
                else:
                    raise ValidationError("The 'model_type' parameter is required and must be 'test' or 'train'.")
                dataset_model.save()

                # Delete the model file from the media directory to free up space
                if os.path.exists(dataset_model.model_file.path):
                    os.remove(dataset_model.model_file.path)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error in processing the model: {e}")
            return Response({"error": "Unable to process the model. Please try again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'])
    def train_model(self, request, pk=None):
        try:
            dataset_model = self.get_object()

            trained_model_details = self.train_model_function(dataset_model.model_file.path, request.user)

            dataset_model.accuracy = trained_model_details['accuracy']
            dataset_model.loss = trained_model_details['loss']
            dataset_model.cm_plot_url = trained_model_details['plot_url']
            dataset_model.save()

            # Delete the model file from the media directory to free up space
            if os.path.exists(dataset_model.model_file.path):
                os.remove(dataset_model.model_file.path)

            return Response(trained_model_details, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error in training the model: {e}")
            return Response({"error": "Unable to process the model. Please try again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def train_model_function(self, zip_file_path, user):
        extract_to_dir = os.path.join(settings.MEDIA_ROOT, 'extracted_data')
        os.makedirs(extract_to_dir, exist_ok=True)

        model_path = os.path.join(settings.BASE_DIR,'coffeleaf', 'ML_functions', 'final_code.keras')
        updated_model_path = os.path.join(settings.BASE_DIR,'coffeleaf','ML_functions', 'final_code_updated.keras')

        # Extract ZIP file and prepare data generator
        train_data_dir = extract_zip(zip_file_path, extract_to_dir)
        train_gen = setup_data_generator(train_data_dir)

        # Load, compile, and train the model
        model = load_and_compile_model(model_path)
        history = train_model(model, train_gen)
        save_model(model, updated_model_path)

        # Return trained model details
        trained_model_details = {
            "accuracy": history.history['accuracy'][-1],
            "loss": history.history['loss'][-1],
            "plot_url": generate_plot(history)
        }

        return trained_model_details
