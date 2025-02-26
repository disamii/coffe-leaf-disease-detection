from rest_framework import serializers
from .models import DiseaseRecommendation, CoffeeLeafImage, CoffeleafDataSetModel, ConfusionMatrix, ClassificationReport, CustomUser, CoffeeLeafForResearcher
from .ML_functions.predict_disease import predict_disease
from .ML_functions.predict_for_researcher import predict_for_researcher
from django.db import transaction
from django.contrib.auth import get_user_model

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'role']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        if password:
            instance.set_password(password)
            instance.save()
        return instance

user_model = get_user_model()

class DiseaseRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiseaseRecommendation
        fields = ['id','disease_name', 'recommendations', 'description', 'link']

class CoffeeLeafImageUploadSerializer(serializers.ModelSerializer):
    recommendation = DiseaseRecommendationSerializer(read_only=True)

    class Meta:
        model = CoffeeLeafImage
        fields = ['image', 'recommendation', 'accuracy']
        read_only_fields = ['accuracy']

    def create(self, validated_data):
        user = self.context['request'].user

        try:
            if not user:
                raise serializers.ValidationError("User is not authenticated.")

            validated_data['uploader'] = user
            with transaction.atomic():

                coffee_leaf_image = CoffeeLeafImage.objects.create(**validated_data)

                predicted_disease, recommendations, accuracy, description, link = predict_disease(coffee_leaf_image.image.path)
                coffee_leaf_image = super().create(validated_data)

                coffee_leaf_image.predicted_disease = predicted_disease
                coffee_leaf_image.accuracy = accuracy

                recommendation = DiseaseRecommendation.objects.filter(disease_name=predicted_disease).first()

                if not recommendation:
                    recommendation = DiseaseRecommendation.objects.create(
                        disease_name=predicted_disease,
                        recommendations="No recommendations available.",
                        description="No description available.",
                        link="No link available."
                    )

                coffee_leaf_image.recommendation = recommendation
                coffee_leaf_image.save()
        except Exception as e:
            print(f"Error while processing image: {e}")
            raise serializers.ValidationError("An error occurred while processing the coffee leaf image.")

        return coffee_leaf_image


class CoffeeLeafForResearcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeLeafForResearcher
        fields = ['image', 'predicted_disease', 'accuracy', ]
        read_only_fields = ['predicted_disease', 'accuracy', ]

    def create(self, validated_data):
        user = self.context['request'].user

        try:
            if not user:
                raise serializers.ValidationError("User is not authenticated.")

            validated_data['uploader'] = user
            with transaction.atomic():

                coffee_leaf_for_researcher = CoffeeLeafForResearcher.objects.create(**validated_data)

                predicted_disease, accuracy = predict_for_researcher(coffee_leaf_for_researcher.image.path)

                coffee_leaf_for_researcher.predicted_disease = predicted_disease
                coffee_leaf_for_researcher.accuracy = accuracy

                coffee_leaf_for_researcher.save()
        except Exception as e:
            print(f"Error while processing image: {e}")
            raise serializers.ValidationError("An error occurred while processing the coffee leaf image.")

        return coffee_leaf_for_researcher

class ConfusionMatrixSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfusionMatrix
        fields = ['id', 'true_positive', 'false_positive', 'false_negative', 'true_negative']

class ClassificationReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassificationReport
        fields = ['id', 'precision', 'recall', 'f1_score', 'support']


class CoffeeLeafTestedModelSerializer(serializers.ModelSerializer):
    classification_reports = ClassificationReportSerializer(many=True, read_only=True)
    confusion_matrices = ConfusionMatrixSerializer(many=True, read_only=True)

    class Meta:
        model = CoffeleafDataSetModel
        fields = ['id', 'model_file','model_type', 'loss', 'accuracy', 'cm_plot_url', 'confusion_matrices', 'classification_reports']
        read_only_fields = ['loss','model_type','accuracy', 'cm_plot_url']


class CoffeeLeafTrainZipSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeleafDataSetModel
        fields = ['id', 'model_file', 'loss', 'accuracy', 'cm_plot_url']
        read_only_fields = ['loss', 'accuracy', 'cm_plot_url']

