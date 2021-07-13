use webdb;

-- emaillist
select * from emaillist order by no desc;

select no,name,password,message,DATE_FORMAT(reg_date, '%y-%m-%d') as regDate from guestbook order by no desc;
delete from guestbook where no=54 and password=1111;

insert into guestbook values(null, '123', '1111', '1111', now());