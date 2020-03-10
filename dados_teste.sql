ALTER TABLE `Spetto`.`preco` 
CHANGE COLUMN `valor` `valor` FLOAT NOT NULL ;


ALTER TABLE `Spetto`.`pedido` 
CHANGE COLUMN `data_pedido` `data_pedido` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;

ALTER TABLE `Spetto`.`usuario` 
DROP FOREIGN KEY `usuario_ibfk_1`,
DROP FOREIGN KEY `usuario_ibfk_2`;
ALTER TABLE `Spetto`.`usuario` 
CHANGE COLUMN `id_endereco` `id_endereco` INT(11) NULL ,
CHANGE COLUMN `id_contato` `id_contato` INT(11) NULL ;
ALTER TABLE `Spetto`.`usuario` 
ADD CONSTRAINT `usuario_ibfk_1`
  FOREIGN KEY (`id_endereco`)
  REFERENCES `Spetto`.`endereco` (`id_endereco`),
ADD CONSTRAINT `usuario_ibfk_2`
  FOREIGN KEY (`id_contato`)
  REFERENCES `Spetto`.`contato` (`id_contato`);


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


