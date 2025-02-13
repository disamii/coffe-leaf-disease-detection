from django.contrib import admin
from .models import CustomUser, DiseaseRecommendation, CoffeeLeafImage, CoffeleafDataSetModel, ConfusionMatrix, ClassificationReport,CoffeeLeafForResearcher

admin.site.register(CustomUser)
admin.site.register(DiseaseRecommendation)
admin.site.register(CoffeeLeafImage)
admin.site.register(CoffeleafDataSetModel)
admin.site.register(ConfusionMatrix)
admin.site.register(ClassificationReport)
admin.site.register(CoffeeLeafForResearcher)
