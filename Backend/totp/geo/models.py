from django.db import models

# Create your models here.
from django.contrib.auth.models import User,Permission

class totp(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    secret = models.CharField(max_length=32)

    