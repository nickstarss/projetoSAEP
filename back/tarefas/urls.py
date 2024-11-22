from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tarefas.views import UsuarioViewSet, TarefaViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'tarefas', TarefaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]