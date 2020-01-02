INSERT INTO `Spetto`.`dono_pedido` () VALUES ();
select * from dono_pedido
INSERT INTO `Spetto`.`cliente` (`id_dono`, `nome`) VALUES (1, "Biridin");
select * from cliente
INSERT INTO `Spetto`.`pedido` () VALUES ();
select * from pedido
INSERT INTO `Spetto`.`usuario` (`nome`) VALUES ("Rodolfo");
select * from usuario
INSERT INTO `Spetto`.`praca` (`id_responsavel`, `nome`) VALUES (1, "Frituras");
INSERT INTO `Spetto`.`produto`(`nome`, `id_praca`) VALUES ("Filé com Fritas", 1);
INSERT INTO `Spetto`.`produto`(`nome`, `id_praca`) VALUES ("Filé com Fritas e Bacon", 1);
INSERT INTO `Spetto`.`produto`(`nome`) VALUES ("Cuba");
select * from usuario, produto
INSERT INTO `Spetto`.`preco` (`id_produto`, `valor`, `dataCorrente`) VALUES (1, 33.5, "2019-12-12");
INSERT INTO `Spetto`.`preco` (`id_produto`, `valor`, `dataCorrente`) VALUES (2, 22.5, "2019-12-12");
INSERT INTO `Spetto`.`preco` (`id_produto`, `valor`, `dataCorrente`) VALUES (6, 12, "2019-12-12");
select * from produto, preco where produto.id_produto = preco.id_produto

select * from produto
alter table produto add categoria nvarchar(max)



select * from produto group


