<?php
/* Проверка наличия полей */
if(!check_post($_POST)) {
	if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		die(json_encode(array('location'=>'thanks.html')));
	} else {
		header("Location: thanks.html");
	}
}



//Защита от ботов (C)
if(
$_POST['email'] == '' || // Проверка на пустое поле email
$_POST['name'] == '' || // Проверка на пустое поле имени
strlen($_POST['phone']) < 6 // Проверка на длину тлф(минимум 5 символов) 
// !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) // Проверка на то, чтобы email был действителен
) 
{
exit('Ошибка!!!'); // Если бот
}


// /**
//  * Итеграция с MailerLite
//  */

// require 'mailerlite.php';

// $groupId='8335696'; //группа: Гандапас СПб ЭИ 22.02.18. Идентификаторы групп смотреть здесь https://app.mailerlite.com/integrations/api/

// $string=array(
//   "email"=> $_POST['email'],
//   "type"=> "subscribed",
//   "fields"=> array(
//       "name"=> $_POST['name'],
//       "phone"=> $_POST['phone']
//   )
// );

// $result=mailerlite_Query('/groups/'.$groupId.'/subscribers',$string, true);


/**
 * ОТПРАВКА ПОЧТЫ ПРИ ЗАПОЛНЕНИИ ФОРМЫ
 */

$sendto   = "info@test"; //Адрес, куда будет приходить письмо
$name  = $_POST['name'];
$phone  = $_POST['phone'];
$email = $_POST['email'];

// Формирование заголовка письма
$subject  = "Заявка на Эмоциоанальный Интеллект Санкт-Петербург 22 февраля";
$headers='';
$headers .= 'From: Gandapas SPB <noreplay@gandapasspb.ru>' . "\r\n"; 
$headers .= 'Reply-To: <'.$email.'>' . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
$headers .= 'Cc: office@vedaevent.ru' . "\r\n"; //Адрес, куда будет приходить копия письма
$headers .= 'Cc: o.mariya@vedaevent.ru' . "\r\n"; //Адрес, куда будет приходить копия письма
$headers .= 'Bcc: maxbatt@qt.com.ua' . "\r\n"; //Адрес, куда будет приходить копия письма


// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Регистрация на Эмоциональный интеллект 22 февраля Санкт-Петербург.</h2>\r\n";
$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
$msg .= "<p><strong>Email:</strong> ".$email."</p>\r\n";



// отправка сообщения открытие страницы благодарности
if(@mail($sendto, $subject, $msg, $headers)) {
	if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		die(json_encode(array('location'=>'thanks.html')));
	} else {
		header("Location: thanks.html");
	}
} else {
	echo "false";
}


function check_post($data) {
	$fields=array('email','name','phone');
	if(!is_array($data)) {
		return false;
	}
	foreach($fields as $key) {
		if(!isset($data[$key])) return false;
	}
	return true;
}
?>