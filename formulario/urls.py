'''
Created on 26/11/2015

@author: jose
'''

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^crear/$', views.crearRuta, name='crearRuta'),
    url(r'^mapa/$', views.verMapa, name='verMapa'),
    url(r'^tabla/$', views.verTabla, name='verTabla'),
]