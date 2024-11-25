from django.db import models

class Usuario(models.Model):
    id_user = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nome


class Tarefa(models.Model):
    PRIORIDADE_CHOICES = [
        ('alto', 'Alto'),
        ('medio', 'Médio'),
        ('baixo', 'Baixo'),
    ]

    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('concluida', 'Concluída'),
        ('em_progresso', 'Em Progresso'),
    ]

    id_tarefa = models.AutoField(primary_key=True)
    descricao = models.TextField()
    prioridade = models.CharField(max_length=10, choices=PRIORIDADE_CHOICES)
    data_cadastro = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    nome_setor = models.CharField(max_length=100)
    id_user = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f"Tarefa {self.id_tarefa}: {self.descricao[:20]} - Usuário: {self.id_user.nome}"
