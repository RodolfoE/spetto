alter table pedido add column id_dono int not null 
create table Spetto.dono_pedido(
	id_dono int not null auto_increment,
    primary key (id_dono)
)

create table Spetto.mesa (
 id_dono int not null,
 id_mesa nvarchar(100) not null,
 foreign key (id_dono) references dono_pedido (id_dono),
 primary key (id_dono, id_mesa)
)

create table Spetto.cliente (
	id_cliente int  not null auto_increment,
    id_dono int not null,    
    nome varchar(100) NOT NULL,
    primary key (id_cliente, id_dono),
    foreign key (id_dono) references Spetto.dono_pedido (id_dono)    
)

create table cliente_delivery( 
	id_cliente int not null auto_increment,
    id_dono int not null,    
    nome nvarchar(300) not null,
    id_contato int not null,
    id_endereco int not null,
    id_responsavel int not null,
    id_entregador int not null,
    primary key (id_cliente,id_dono),
    foreign key (id_dono) references dono_pedido (id_dono),
    foreign key (id_contato) references contato (id_contato),
    foreign key (id_endereco) references endereco (id_endereco),
    foreign key (id_responsavel) references usuario (id_usuario),
    foreign key (id_entregador) references usuario (id_usuario)	
)

create table Spetto.papel(
	id_papel int not null auto_increment,  
    cargo nvarchar(300) not null,
    primary key (id_papel, cargo)
)

create table papeis(
	id_papel int not null,
    id_usuario int not null,
    foreign key (id_papel) references papel (id_papel),
    foreign key (id_usuario) references usuario (id_usuario)
)

create table Spetto.endereco(
	id_endereco int not null auto_increment,
    rua varchar(300) not null,
    numero int not null,
    bairro varchar(300) not null,
    cidade  varchar(300) not null,
    estado  varchar(300) not null,
    observacao varchar(300) not null,
    primary key (id_endereco)
)

create table Spetto.contato(
	id_contato int not null auto_increment,
    tel_celular nvarchar(300) not null,
    email nvarchar(300) not null,
    primary key (id_contato, tel_celular, email)
)

create table Spetto.usuario(
	id_usuario int not null auto_increment,
    nome nvarchar(300) not null,
    id_endereco int not null,
    id_contato int not null,
    primary key (id_usuario, nome),
    foreign key (id_endereco) references endereco (id_endereco),
    foreign key (id_contato) references contato (id_contato)
)

create table Spetto.historico_dono(
	id_pedido int not null,
    id_dono int not null,
    primary key (id_pedido, id_dono),
    foreign key (id_pedido) references pedido (id_pedido),
    foreign key (id_dono) references dono_pedido (id_dono)
)

create table Spetto.pedido(
	id_pedido int not null auto_increment,
    data_pedido date not null,
    primary key (id_pedido)
)

create table Spetto.venda(
	id_pedido int not null,
    total decimal,
    qt_pago decimal,
    data date,
    fechado int,
    nota int,
    sugestao varchar(300),
    primary key (id_pedido),
    foreign key (id_pedido) references pedido (id_pedido)
)

create table Spetto.formas_pagamento(
	id_pedido int not null,
    id_forma int not null,
	valor decimal,
    foreign key (id_pedido) references venda (id_pedido),
    foreign key (id_forma) references pagamento (id_forma)
)

create table pagamento(
	id_forma int not null auto_increment,
    nome varchar(300),
    primary key (id_forma)
)

create table itens_pedido(
 id_pedido int not null,
 id_produto int not null,
 id_responsavel int not null,
 data_inicio_entrega date,
 data_fim_entrega date,
 observacao varchar(300) default 'Use o amor como tempero',
 id_responsavel_cozinha int,
 data_inicio_cozinha date,
 data_termino_cozinha date,
 ordem int not null,
 primary key (id_pedido, id_produto, ordem),
 foreign key (id_responsavel) references usuario (id_usuario),
 foreign key (id_responsavel_cozinha) references usuario (id_usuario),
 foreign key (id_produto) references produto (id_produto)
)

create table produto(
	id_produto int not null auto_increment,
    nome varchar(300), 
    tempo_medio_preparo varchar(300), 
    id_praca int,
    primary key (id_produto, nome),
    foreign key (id_praca) references praca (id_praca)
)

create table praca(
	id_responsavel int not null,
    id_praca int not null auto_increment,
    nome varchar(300),
    primary key (id_praca),
    foreign key (id_responsavel) references usuario (id_usuario)
)

create table cozinheiros_praca(
	id_usuario int not null,
    id_praca int not null,
    primary key (id_praca, id_usuario),
    foreign key (id_usuario) references usuario (id_usuario),
    foreign key (id_praca) references praca (id_praca)
)

create table preco(
	id_preco int not null auto_increment,
    id_produto int not null,
    valor decimal,
    dataCorrente date,
    primary key (id_preco, id_produto, dataCorrente),
    foreign key (id_produto) references produto (id_produto)
)