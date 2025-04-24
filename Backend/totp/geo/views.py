from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate
import json
from django.contrib.auth.models import User,Permission
import pyotp
from .models import totp
# Create your views here.

@api_view(['GET'])
def generate_secret(request,username,password):
    user = authenticate(username=username,password=password)
    print(user)
    if user:

        secret = pyotp.random_base32()
        totp.objects.update_or_create(user=user, defaults={"secret": secret})

        # Generate otpauth:// URL
        generated_totp = pyotp.TOTP(secret)
        otp_uri = generated_totp.provisioning_uri(name=username, issuer_name="MyApp")

        return Response({"secret":secret,"otp_uri":otp_uri},status=status.HTTP_200_OK)
    else:
        return Response('Invalid Login',status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def generate_code(request,username):

    user = User.objects.get(username=username)
    print(user)
    if user:
        totp_obj = totp.objects.get(user=user)
        print(totp_obj.secret)
        code = pyotp.TOTP(str(totp_obj.secret))
        print(code.now())

        return Response({'code':code.now()},status=status.HTTP_200_OK)
    else:
        return Response({'error':' User not found'},status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def validate_totp(request):
    data = request.data
    print(data)
    username = data.get('username')
    code = data.get('code')

    user = User.objects.get(username=username)
    if user:
        totp_obj = totp.objects.get(user=user)
        generated_totp = pyotp.TOTP(totp_obj.secret)

        if generated_totp.verify(code,valid_window=0):
            # Here, you can generate a JWT token for the user (token generation not shown)
            return Response({'status': 'success', 'message': 'Authenticated'},status=status.HTTP_200_OK)
        
        return Response({'status': 'error', 'message': 'Invalid or expired code'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'status':'error','message':'User not found'},status=status.HTTP_403_FORBIDDEN)