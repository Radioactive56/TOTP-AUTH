
from django.urls import path,include
from .views import generate_secret,validate_totp,generate_code

urlpatterns = [
    path('generate/<str:username>/<str:password>/',generate_secret),
    path('verify/',validate_totp),
    path('getcode/<str:username>/',generate_code),
]
