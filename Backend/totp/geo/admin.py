from django.contrib import admin
from .models import totp
# Register your models here.

class totpAdmin(admin.ModelAdmin):
    list_display=['user','secret']
    search_fields=['user']

admin.site.register(totp,totpAdmin)