
from django.urls import path,include
from .views import generate_secret

urlpatterns = [
    path('generate/',generate_secret),
]
