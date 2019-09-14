<?php 

 require_once('PHPMailer/PHPMailerAutoload.php');

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$message = "";

if ($_POST['phone'] != '') {

	$message.="<b>Name:</b> $name<br />";
	$message.="<b>Phone:</b> $phone<br />";

	echo 0;

}

else {

	echo 1;

}

$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';
$mail->Host = 'smtp.gmail.com';
$mail->Port = '465';
$mail->isHTML();
$mail->Username = 'masterprofiukr@gmail.com';
$mail->Password = 'nekr_org1';
$mail->SetFrom('no-reply@howcode.org');
$mail->Subject = 'Max, it s new CLIENT call HIM';
$mail->Body = $message;
$mail->AddAddress('master.profi@ukr.net');

$mail->Send();

?>

