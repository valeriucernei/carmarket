<?php
require_once dirname(__FILE__).'/../config.php';
require_once dirname(__FILE__).'/../../vendor/autoload.php';

class SMTPClient{

  private $mailer;

  public function __construct(){
    $transport = (new Swift_SmtpTransport(Config::SMTP_HOST, Config::SMTP_PORT))
      ->setUsername(Config::SMTP_USER)
      ->setPassword(Config::SMTP_PASSWORD);
    $this->mailer = new Swift_Mailer($transport);
  }

  public function send_register_user_token($user){
    $message = (new Swift_Message('CarMarket | Confirm Registration'))
      ->setFrom(['noreply@car-market.live' => 'CarMarket No Reply Mail'])
      ->setTo([$user['email']])
      ->setBody('Confirmation link: http://localhost/carmarket/api/users/confirm/'.$user['token']);
    $this->mailer->send($message);
  }

}
?>
