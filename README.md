### Totem Express UI

Aplicação para simular um totem de fast-food.

### Tecnologias

![vue](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

### Como Rodar?

Com o [docker instalado em seu computador](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) execute:

```shell
docker compose up
```

Isso irá subir um servidor `Vite` em modo desenvolvimento na porta `5173`

Desta forma, você só precisa acessar a [tela principal da aplicação](http://localhost:5173)

### Rotas Principais

| Rota | Descrição |
|------|-----------|
| [Inicio Totem](http://localhost:5173/) | Tela inicial do totem para identificação do usuário
| [Admin de Produtos](http://localhost:5173/admin/products) | Tela administrativa de produtos cadastrados no totem
| [Listagem de Pedidos](http://localhost:5173/admin/orders) | Tela administrativa de listagem de pedidos realizados no totem

Ademais, há outras rotas mapeadas para navegação do usuário durante a criação do pedido, como a rota de seleção de produtos e confirmação do pedido.


