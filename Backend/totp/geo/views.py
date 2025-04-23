from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import json
from django.contrib.auth.models import User,Permission
import pyotp
from .models import totp
# Create your views here.

@api_view(['POST'])
def generate_secret(request):
    data = request.data
    username = data.get('username')
    user = User.objects.get(username=username)
    if user:
        secret = pyotp.random_base32()
        totp.objects.update_or_create(user=user, defaults={"secret": secret})

        # Generate otpauth:// URL
        totp = pyotp.TOTP(secret)
        otp_uri = totp.provisioning_uri(name=username, issuer_name="MyApp")

        return Response({"secret":secret,"otp_uri":otp_uri},status=status.HTTP_200_OK)
    else:
        return Response('Invalid Login',status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def validate_totp(request):
    data = request.body
    username = data.get('username')
    code = data.get('code')

    user = User.objects.get(username=username)
        