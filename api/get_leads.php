<?php
// Affiche les erreurs pour débogage (à désactiver en production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Autorise l'accès CORS (utile si front et API sont sur des ports différents)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Exemple de données (à remplacer par une vraie requête SQL plus tard)
$emails = [
    [
        "email" => "john.doe@example.com",
        "date" => "2025-05-10",
        "status" => "Actif"
    ],
    [
        "email" => "jane.smith@example.com",
        "date" => "2025-05-11",
        "status" => "Inactif"
    ]
];

// Renvoie les données au format JSON
echo json_encode($emails);
exit;
?>
