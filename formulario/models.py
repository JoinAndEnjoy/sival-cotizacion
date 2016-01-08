from django.db import models


# Create your models here.

class Cotizacion(models.Model):
    nombre = models.CharField(max_length=200)
    correo = models.EmailField(max_length=254)
    comentarios = models.CharField(max_length=400)
    salida = models.DateTimeField()
    regreso = models.DateTimeField(null=True)
    fecha = models.DateField(auto_now_add=True)
    camino = models.IntegerField()
    distancia = models.DecimalField(max_digits=100, decimal_places=5)
    distancia2 = models.DecimalField(max_digits=100, decimal_places=5, null=True)
    respondido = models.BooleanField(default=False)
    def __unicode__(self):  # __unicode__ on Python 2
        return (self.nombre + " / %s")%(str(self.fecha))
    
class Punto(models.Model):
    nombre = models.CharField(max_length=200)
    lat = models.DecimalField(max_digits=10, decimal_places=7)
    lng = models.DecimalField(max_digits=10, decimal_places=7)
    secuencia = models.IntegerField()
    CHOICES = (
                ('OR', 'origen'),
                ('DS', 'destino'),
    )
    camino = models.CharField(max_length=2, choices=CHOICES)
    cotizacion= models.ForeignKey(Cotizacion,on_delete=models.CASCADE)
    def __unicode__(self):              # __unicode__ on Python 2
        return self.nombre  


