
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from api.views import home  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('coffeleaf.urls')),  
    # path('', home, name='home'),  # Main homepage
    path('training/', include('training.urls')),
    path('test_model/', include('test_model.urls')),  

]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

