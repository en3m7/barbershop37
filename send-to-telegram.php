<?php
header('Content-Type: application/json');

// Настройки Telegram бота
$botToken = '7640965702:AAEDq5X3IthGjXoF1REtOpzqV3RuNByrp70'; // Замените на токен вашего бота
$chatId = '-4741180688';   // Замените на ID чата или группы

// Получаем данные из формы
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Проверяем обязательные поля
if (empty($name) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Заполните обязательные поля']);
    exit;
}

// Формируем сообщение для Telegram
$text = "📌 *Новая заявка*:\n\n";
$text .= "👤 *Имя*: $name\n";
$text .= "📱 *Телефон*: $phone\n";
if (!empty($message)) {
    $text .= "✉ *Сообщение*: $message\n";
}

// Отправляем в Telegram через API бота
$url = "https://api.telegram.org/bot{$botToken}/sendMessage";
$params = [
    'chat_id' => $chatId,
    'text' => $text,
    'parse_mode' => 'Markdown'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// Проверяем успешность отправки
$responseData = json_decode($response, true);
if ($responseData && $responseData['ok']) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка при отправке в Telegram']);
}
?>