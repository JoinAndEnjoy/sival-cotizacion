from django.db import models

# Create your models here.

class Ruta(models.Model):
    origen = models.CharField(max_length=200)
    destino = models.CharField(max_length=200)