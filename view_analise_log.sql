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
