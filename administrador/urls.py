# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.administrador, name='administrador'),
    url(r'^json/$', views.jsonServidor, name='getjson'),
]