<?php
header('Content-Type: application/json; charset=utf-8');

function respond($status, array $payload)
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Use POST to submit the contact form.']);
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$category = $_POST['category'] ?? 'general';
$messageSubject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';
$honeypot = $_POST['website_url'] ?? '';

foreach ([$name, $email, $category, $messageSubject, $message, $honeypot] as $value) {
    if (!is_string($value)) {
        respond(422, ['success' => false, 'message' => 'Please check the form fields and try again.']);
    }
}

if (trim($honeypot) !== '') {
    respond(422, ['success' => false, 'message' => 'Unable to process this submission.']);
}

$name = trim($name);
$email = trim($email);
$category = trim($category);
$messageSubject = trim($messageSubject);
$message = trim($message);
$name = trim(preg_replace('/[\x00-\x1F\x7F]/', ' ', $name));

if (
    $name === '' ||
    strlen($name) > 200 ||
    strlen($email) > 254 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    strlen($messageSubject) > 200 ||
    strlen($message) < 10 ||
    strlen($message) > 10000 ||
    preg_match('//u', $name) !== 1 ||
    preg_match('//u', $messageSubject) !== 1 ||
    preg_match('//u', $message) !== 1
) {
    respond(422, ['success' => false, 'message' => 'Please check the form fields and try again.']);
}

$categories = [
    'banking' => 'Digital Banking & Finacle Advisory',
    'automation' => 'Process Automation & UiPath RPA',
    'database' => 'Oracle / MSSQL Database Architecture',
    'speaking' => 'Toastmasters & Speaking Engagement',
    'general' => 'General Inquiries / Greetings',
];

if (!isset($categories[$category])) {
    respond(422, ['success' => false, 'message' => 'Please select a valid inquiry type.']);
}

$recipient = 'friendship.rajan@gmail.com';
$subject = $name . ' tried to connect you thru website';
$encodedSubject = function_exists('mb_encode_mimeheader')
    ? mb_encode_mimeheader($subject, 'UTF-8', 'B')
    : '=?UTF-8?B?' . base64_encode($subject) . '?=';

$body = implode("\r\n", [
    'Name: ' . $name,
    'Email: ' . $email,
    'Inquiry type: ' . $categories[$category],
    'Subject: ' . ($messageSubject !== '' ? $messageSubject : '(not provided)'),
    '',
    'Message:',
    $message,
]);

$headers = implode("\r\n", [
    'From: Rajan Maharjan Website <mail@rajanmaharjan.com.np>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
]);

if (!mail($recipient, $encodedSubject, $body, $headers)) {
    error_log('Contact form email could not be accepted by the configured mail transport.');
    respond(500, ['success' => false, 'message' => 'The mail server could not accept your message. Please try again later.']);
}

respond(200, ['success' => true, 'message' => 'Your message has been submitted.']);
