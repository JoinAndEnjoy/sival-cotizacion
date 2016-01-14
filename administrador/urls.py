# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.administrador, name='administrador'),
    url(r'^json/$', views.jsonServidor, name='getjson'),
    url(r'^rutaida/(?P<id>[0-9]+)/$', views.rutaIda, name='getruta1'),
    url(r'^rutavuelta/(?P<id>[0-9]+)/$', views.rutaVuelta, name='getruta2'),
    url(r'^guardar/$', views.crearPropuesta, name='crear'),
    url(r'^propuesta/(?P<slug>[^\.]+)/$', views.darPropuesta, name='propuesta'),
    url(r'^solicitudes/$', views.HistorialSolicitud, name='solicitud'),
     url(r'^propuestas/$', views.HistorialPropuestas, name='propuestas'),
    url(r'^json2/$', views.jsonSolicitudes, name='getjson2'),
    url(r'^json3/$', views.jsonPropuestas, name='getjson3'),
]