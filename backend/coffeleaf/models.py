# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission,BaseUserManager
from django.contrib.auth import get_user_model  

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)



class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("researcher", "Researcher"),
        ("farmer", "Farmer"),
    )

    email = models.EmailField(unique=True)  
    username = None 
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="farmer")

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_groups',  
        blank=True,
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions',  # Avoid clashes
        blank=True,
    )

    USERNAME_FIELD = 'email'  # Set email as the unique identifier
    REQUIRED_FIELDS = []  # Remove 'username' from required fields

    objects = CustomUserManager()  
    def str(self):
        return self.email  # Return email instead of username
    

User = get_user_model()
    
class DiseaseRecommendation(models.Model):
    disease_name = models.CharField(max_length=50,  unique=True)
    recommendations = models.TextField()    
    description = models.CharField(max_length=200)
    link = models.CharField(max_length=50)
    def str(self):
        return self.disease_name


class CoffeeLeafImage(models.Model):
    uploader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='coffee_leaf_images')
    image = models.ImageField(upload_to='coffee_leaf_images/')
    accuracy = models.FloatField(blank=True, null=True)
    recommendation = models.ForeignKey(DiseaseRecommendation, on_delete=models.SET_NULL, blank=True, null=True)

    def str(self):
        return f"{self.label} - {self.image.name}"

class CoffeeLeafForResearcher(models.Model):
    image = models.ImageField(upload_to='coffee_leaf_images/')
    uploader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='train_models')
    predicted_disease=models.CharField(max_length=50)
    accuracy = models.FloatField(blank=True,null=True)
    loss = models.FloatField(blank=True,null=True)
    def __str__(self):
        return f"Trained Model with Accuracy: {self.accuracy}"


class CoffeleafDataSetModel(models.Model):
    MODEL_TYPE_CHOICES = [
        ('train', 'Train'),
        ('test', 'Test'),
    ]

    uploader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='coffe_leaf_dataset')
    model_file = models.FileField(upload_to='tested_models/')
    accuracy = models.FloatField(blank=True, null=True)
    loss = models.FloatField(blank=True, null=True)
    cm_plot_url = models.TextField(blank=True, null=True)
    model_type = models.CharField(max_length=5, choices=MODEL_TYPE_CHOICES, default='train')

    def __str__(self):
        return f"Model ({self.model_type}) with Accuracy: {self.accuracy}"



class ConfusionMatrix(models.Model):
    trained_model = models.ForeignKey(CoffeleafDataSetModel, related_name='confusion_matrices', on_delete=models.CASCADE)
    true_positive = models.IntegerField()
    false_positive = models.IntegerField()
    false_negative = models.IntegerField()
    true_negative = models.IntegerField()

    def __str__(self):
        return f"Confusion Matrix for {self.trained_model}"


class ClassificationReport(models.Model):
    trained_model = models.ForeignKey(CoffeleafDataSetModel, related_name='classification_reports', on_delete=models.CASCADE)
    precision = models.FloatField()
    recall = models.FloatField()
    f1_score = models.FloatField()
    support = models.IntegerField()

    def __str__(self):
        return f"Classification Report for {self.trained_model}"
