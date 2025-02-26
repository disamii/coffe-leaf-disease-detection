# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DiseaseRecommendationViewSet, CoffeeLeafImageViewSet, CoffeeLeafDataSetViewSet, ObtainAuthTokenView,CustomUserViewSet,CoffeeLeafForResearcherViewSet

router = DefaultRouter()
router.register(r'users',CustomUserViewSet)
router.register(r'disease_recommendations', DiseaseRecommendationViewSet)
router.register(r'predict_for_farmer', CoffeeLeafImageViewSet)
router.register(r'predict_for_researcher',CoffeeLeafForResearcherViewSet)
router.register(r'coffe_leaf',CoffeeLeafDataSetViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('token/', ObtainAuthTokenView.as_view(), name='token_obtain_pair')]


