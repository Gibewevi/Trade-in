import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

// Initialisation de MailerSend avec votre clé API
const mailerSend = new MailerSend({
    apiKey: process.env.MAILSEND_API_KEY
});

// fonction qui envoie un mail et qui prend en param (email, password)
async function sendStartPassword(emailAddress, password) {
    const sender = new Sender("contact@bitlearn.fr", "BitLearn");
    const recipient = new Recipient(emailAddress, "Utilisateur de BitLearn");

    const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo([recipient])
        .setSubject("Bienvenue sur BitLearn")
        .setHtml(`
<p>Bonjour et merci pour votre confiance !</p>
<p><strong>Bienvenue sur BitLearn</strong> — votre plateforme d'apprentissage en ligne.</p>
<p>Vous pouvez désormais accéder à votre formation en utilisant les identifiants suivants :</p>
<ul>
    <li><strong>Email :</strong> ${emailAddress}</li>
    <li><strong>Mot de passe :</strong> ${password}</li>
</ul>
<p>Nous vous conseillons de changer votre mot de passe lors de votre première connexion pour des raisons de sécurité.</p>
<p>Merci et bon apprentissage !</p>
`);


    try {
        const response = await mailerSend.email.send(emailParams);
        console.log("Réponse de l'API MailerSend:", response);
        return 'Email envoyé avec succès';
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        throw error;
    }
}


// Contrôleur utilisateur
const mailController = {
    sendStartPassword,
};

export default mailController;
