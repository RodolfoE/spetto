 DECLARE @dia DATE
 DECLARE @reqHrs table(
     dia NVARCHAR(300),
     Horas NVARCHAR(10),
     Requisições int,
     Porcentagem float
 )
 DECLARE @mediaDasRequisicoes table(
     Dia NVARCHAR(300),
     Media float
 )
 DECLARE dias Cursor for
    select DISTINCT (CONVERT(date, dateadd(hour, -3, data))) as dia from logs where Banco is null order by dia
    open dias
    FETCH NEXT FROM dias INTO @dia;
    WHILE @@FETCH_STATUS = 0  
    BEGIN
        DECLARE itens CURSOR for
            select Dia, hrs as Horas, count(hrs) as Requisições, CAST((100 * (CAST(count(hrs) as float) / CAST((select COUNT(Id) from Logs where Banco is null AND CONVERT(date, dateadd(hour, -3, data)) = @dia) as float))) as NUMERIC(10, 3)) as '% No Dia'
            from (select  CONVERT(date, data) as dia, datepart(hh, dateadd(hour, -3, data)) as hrs, Id from logs where Banco is null AND CONVERT(date, dateadd(hour, -3, data)) = @dia) as horas
            GROUP by dia, hrs ORDER BY hrs
            open itens
        DECLARE @qtdHrs int = 0
        DECLARE @qtdRequicao int = 0
        DECLARE @dia1 NVARCHAR(300), @Horas NVARCHAR(10), @Requisições int, @Porcentagem float
        FETCH NEXT FROM itens INTO @dia1, @Horas, @Requisições, @Porcentagem;
        WHILE @@FETCH_STATUS = 0  
        BEGIN
            SET @qtdHrs += 1
            SET @qtdRequicao += @Requisições
            INSERT INTO @reqHrs (dia, Horas, Requisições, Porcentagem) values (@dia1, @Horas, @Requisições, @Porcentagem)
            FETCH NEXT FROM itens INTO @dia1, @Horas, @Requisições, @Porcentagem;            
        END
        INSERT INTO @mediaDasRequisicoes (Dia, Media) values (@dia, @qtdRequicao / @qtdHrs)
        CLOSE itens;
        DEALLOCATE itens;
        FETCH NEXT FROM dias INTO @dia;
    END;
CLOSE dias;
DEALLOCATE dias;
select * from @reqHrs
select * from @mediaDasRequisicoes



/*ENDPOINT mais usados, erros mais comuns e informações detalhadas dos endpoints*/

select
url, count (url) as 'Número de Requisições', 
CAST((100 * (CAST(count (url) as float) / CAST((select count (Id) as qtd from logs where url not in ('/login', '/')  AND status = '200') as float))) as NUMERIC(10, 3)) as '% Total'
from logs where url not in ('/login', '/', '/home') AND status = '200'
group by url order by 'Número de Requisições' desc

select
url, status,  count (url) as 'Número de Requisições', 
CAST((100 * (CAST(count (url) as float) / CAST((select count (Id) as qtd from logs where url not in ('/login', '/')  AND status not in('200', '302', '304')) as float))) as NUMERIC(10, 3)) as '% De Erro'
from logs where url not in ('/login', '/', '/home') AND status not in('200', '302', '304')
group by url, status order by 'Número de Requisições' desc


select logs.*, usr.Nome from logs
left join [ElasticQuery-Runner].dbo.Usuarios usr on logs.Id_Usuario = usr.Id
where
url like '%/get_cli_inst_tag%' 
AND status not in('200', '302', '304')
