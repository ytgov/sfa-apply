<template>
  <v-container fluid>
    <Faq :faqs="faqs[locale]" />
  </v-container>
</template>

<i18n>
{
  "en": {

  },
  "fr": {
    
  }
}
</i18n>

<script>
import Faq from '~/components/Faq.vue';

export default {
  head (){
    return {
      title: 'Yukon Student Financial Portal - FAQ'
    }
  },

	components: {
    Faq
  },
  computed: {
    locale() {
      return this.$i18n.locale
    }
  },
  data() {
    return {
      faqs: {
        en: [
          {
            question: 'Can you  receive the Yukon Grant and the Student Training Allowance?',
            answer: '<p>No, you cannot receive the Yukon Grant and the Student Training Allowance at the same time. You have to choose the funding that suits you best if you:</p><ul><li>attend a Yukon Institution; and</li><li>are eligible for both grants.</li></ul>'
          },
          {
            question: 'Can you combine the 2 grants?',
            answer: '<p>You can receive a total of 170 weeks of funding from the Yukon Grant and the Student Training Allowance combined.</p><p>For example, if you use 68 weeks of the Student Training Allowance, you\'ll have</p> <ul><li>102 weeks of funding left for either:</li><li>Student Training Allowance; or</li><li>the Yukon Grant.</li></ul>'
          },
          {
            question: 'What if you have a gap between secondary and post-secondary education?',
            answer: '<p>You can receive the Yukon Grant if there is a gap between when:</p><ul><li>you finish secondary</li><li>schooling; and</li><li>you begin post-secondary schooling.</li></ul><p>You must continue to meet the eligibility requirements. <a href="https://yukon.ca/en/yukon-grant#eligibility" target="_blank">https://yukon.ca/en/yukon-grant#eligibility</a>'
          },
          {
            question: 'Can students receive student financial assistance from more than one funding source?',
            answer: '<p>Students may receive the Yukon Grant along with other funding programs. Students must meet all eligibility requirements.</p> <a href="https://yukon.ca/en/yukon-grant#eligibility" target="_blank">https://yukon.ca/en/yukon-grant#eligibility</a>'
          },
          {
            question: 'Do you have to apply every year?',
            answer: '<p>Students need to submit a new application every year or when there is a break in studies for more than 3 weeks.</p>'
          },
          {
            question: 'When can you apply?',
            answer: '<p>You can apply after May 1, 2022. Remember each funding program has its own deadline for the application. Deadline for Yukon Grant is 6 weeks after the start of classes. Deadline to receive full payment of the Student Training Allowance is 14 school days after the start of classes. The Canada Student Loan/Grant application must be completed within 8 weeks of your end date of classes.</p>'
          },
          {
            question: 'How do you receive the funding?',
            answer: '<ul><li>The Yukon Grant is by either direct deposit or a cheque mailed to your home address in the Yukon.</li><li>Student Training Allowance is paid by direct deposit by Yukon University.</li><li>Canada Student Financial Assistance program is paid by direct deposit by the Federal Government.</li></ul>'
          },
          {
            question: 'What if you do not return for the summer?',
            answer: '<p>Students that are away from Yukon while not in full-time studies may be asked to provide additional information regarding residency.</p><p>Students may not be eligible for the annual travel amount of $1500 if they do not return to the Yukon since they last received a travel amount.</p>'
          },
          {
            question: 'When will you get your funds?',
            answer: '<p>All applications are assessed on a first-come, first-serve basis. Yukon Grant are disbursed by semester or quarter. For example, if you are attending two semesters, your 1st funding amount would be issued no earlier than the start of each semester.</p>'
          },
          {
            question: 'Do you pay income tax on the grant?',
            answer: '<p>Yes, you will be issued a T4A.</p>'
          },
          {
            question: 'Does the Yukon Grant have to be paid back?',
            answer: '<p>If you withdraw from studies or change from full-time to part-time status, you will be required to pay back all or part of the Yukon Grant.</p>'
          },
          {
            question: 'How do you qualify for a Student Training Allowance?',
            answer: '<p>You’re eligible to receive the Training Allowance if you have been a resident of the Yukon for 24 months immediately prior to your classes commencing.</p>'
          },
          {
            question: 'Where is my Student Training Allowance funding sent?',
            answer: '<p>Yukon University will pay by direct deposit to your bank account on file.</p>'
          },
          {
            question: 'Do I pay income tax on the Student Training Allowance?',
            answer: '<p>You will be issued a T4A for your Training Allowance through Yukon University.</p>'
          },
          {
            question: 'Does the Student Training Allowance have to be paid back?',
            answer: '<p>If you have been overpaid, for any reason, you must pay back that portion of the training allowance, otherwise, no repayment is required.</p>'
          },
          {
            question: 'Canada Student Financial Assistance Program Grant for students with disabilities:',
            answer: '<p> Students are required to submit a separate application (schedule D).</p>'
          },
          {
            question: 'What if I have difficulty repaying my Canada Student loan?',
            answer: '<p>If you have difficulty repaying your Canada Student Financial Assistance loan, the Government of Canada can help. Visit <a href="www.canlearn.ca" target="_blank">www.canlearn.ca</a> or contact the National Student Loans Service Centre(NSLSC) for more information about your repayment options.</p>'
          },
          {
            question: 'How do I contact the National Student Loans Service Centre (NSLSC)?',
            answer: '<p>National Student Loans Service Centre (NSLSC)<br/>888-815-4514 (within North America) TTY: 888-815-4556</br>800-2-225-2501 (outside North America)</p><p>Visit <a href="www.canlearn.ca" target="_blank">www.canlearn.ca</a> to access the NSLSC Web site.</p>'
          }
        ],
        fr: [
          {
            question: 'Pouvez-vous à la fois recevoir la Bourse du Yukon et l’Allocation pour la formation des étudiants?',
            answer: '<p>Non, vous ne pouvez pas recevoir à la fois la Bourse du Yukon et l’Allocation pour la formation des étudiants. Vous devez choisir l’aide financière qui vous convient le plus si &nbsp;:</p><ul><li>vous fréquentez un établissement au Yukon;</li><li>vous êtes admissible à ces deux aides financières.</li></ul>'
          },
          {
            question: 'Pouvez-vous combiner deux bourses?',
            answer: '<p>Si vous êtes admissible à la fois à la Bourse du Yukon et à l’Allocation pour la formation des étudiants, vous pourriez recevoir une aide financière pendant 170&nbsp;semaines au total.</p><p>Par exemple, si vous utilisez 68&nbsp;semaines de votre Allocation pour la formation des étudiants, vous auriez encore droit à&nbsp;:</p> <ul><li>102&nbwp;semaines d’aide financière applicable&nbswp;:</li><li>soit dans le cadre de l’Allocation pour la formation des étudiants;</li><li>soit dans le cadre de la Bourse du Yukon.</li></ul>'
          },
          {
            question: 'Qu’arrive-t-il si vous avez interrompu vos études entre le secondaire et le postsecondaire?',
            answer: '<p>You can receive the Yukon Grant if there is a gap between when:</p><ul><li>la fin du secondaire;</li><li>schooling; and</li><li>et le début de vos études postsecondaires.</li></ul><p>Vous devez toutefois continuer à répondre aux conditions d’admissibilité. <a href="https://yukon.ca/fr/bourse-yukon#admissibilité " target="_blank">https://yukon.ca/fr/bourse-yukon#admissibilité</a>'
          },
          {
            question: 'Les étudiants peuvent-ils recevoir une aide financière de plusieurs sources?',
            answer: '<p>Les étudiants peuvent recevoir la Bourse du Yukon en plus de certains autres types d’aide financière. Les étudiants doivent toutefois satisfaire à tous les critères d’admissibilité.</p> <a href="https://yukon.ca/fr/bourse-yukon#admissibilité" target="_blank">https://yukon.ca/fr/bourse-yukon#admissibilité</a>'
          },
          {
            question: 'Doit-on présenter une demande tous les ans?',
            answer: '<p>Les étudiants doivent présenter une nouvelle demande tous les ans ou lorsqu’ils interrompent leurs études pendant plus de trois semaines.</p>'
          },
          {
            question: 'Quand pouvez-vous présenter une demande?',
            answer: '<p>Vous pouvez présenter une demande après le 1er&nbsp;mai&nbsp;2022. Rappelez-vous que chaque programme a ses propres dates limites pour présenter une demande. La date limite pour la Bourse du Yukon est six semaines après le début des cours. La date limite pour recevoir le paiement entier de l’Allocation pour la formation des étudiants est 14&nbsp;jours de classe après le début des cours. La demande de bourse ou de prêt d’études canadien doit être remplie au plus tard huit semaines après la date de fin des cours.</p>'
          },
          {
            question: 'Comment reçoit-on les fonds?',
            answer: '<ul><li>La Bourse du Yukon est remise soit par dépôt direct, soit par chèque posté à votre adresse domiciliaire au Yukon.</li><li>L’Allocation pour la formation des étudiants est remise par dépôt direct par l’Université du Yukon.</li><li>Le Programme canadien d’aide financière aux étudiants remet les fonds par dépôt direct de la part du gouvernement fédéral.</li></ul>'
          },
          {
            question: 'Que se passe-t-il si vous ne revenez pas à l’été?',
            answer: '<p>Les étudiants qui sont à l’extérieur du Yukon lorsqu’ils n’étudient pas à temps plein pourraient devoir fournir des renseignements additionnels au sujet de leur lieu de résidence.</p><p>Les étudiants pourraient ne pas être admissibles à l’allocation de déplacement de 1&nbsp;500&nbsp;$ par année s’ils ne sont pas retournés au Yukon depuis la dernière fois où ils ont reçu une allocation de déplacement.</p>'
          },
          {
            question: 'Quand reçoit-on les fonds?',
            answer: '<p>Toutes les demandes sont traitées selon le principe du premier arrivé, premier servi. La Bourse du Yukon est versée chaque semestre (ou trimestre). Par exemple, si vous êtes aux études pendant deux semestres, le montant de votre bourse serait versé au début de chaque semestre.</p>'
          },
          {
            question: 'La Bourse du Yukon est-elle imposable?',
            answer: '<p>Oui, un feuillet T4A vous sera délivré.</p>'
          },
          {
            question: 'Devrez-vous rembourser la Bourse du Yukon?',
            answer: '<p>Si vous abandonnez vos études ou si vous cessez d’étudier à temps plein pour le faire à temps partiel, vous devrez rembourser en tout ou en partie la Bourse du Yukon.</p>'
          },
          {
            question: 'Qui est admissible à l’Allocation pour la formation des étudiants?',
            answer: '<p>Vous êtes admissible à une allocation de formation si vous étiez un résident du Yukon au cours des 24&nbsp;mois précédant immédiatement le début de vos cours.</p>'
          },
          {
            question: 'Où mon Allocation pour la formation des étudiants est-elle envoyée?',
            answer: '<p>L’Université du Yukon versera les fonds par dépôt direct dans le compte bancaire indiqué dans votre dossier.</p>'
          },
          {
            question: 'L’Allocation pour la formation des étudiants est-elle imposable?',
            answer: '<p>Oui, l’Université du Yukon délivrera un feuillet T4A pour le montant de l’allocation versé.</p>'
          },
          {
            question: 'Doit-on rembourser l’Allocation pour la formation des étudiants?',
            answer: '<p>Si, pour une raison quelconque, vous avez reçu une allocation trop importante, vous devrez rembourser la portion reçue en trop. Sinon, vous n’avez rien à rembourser.</p>'
          },
          {
            question: 'Bourse canadienne pour étudiants ayant une incapacité&nbsp;:',
            answer: '<p>Les étudiants doivent présenter un formulaire de demande distinct pour cette bourse (Annexe D).</p>'
          },
          {
            question: 'Que puis-je faire si j’ai du mal à rembourser mon prêt étudiant?',
            answer: '<p>Si vous avez de la difficulté à rembourser votre prêt étudiant, le gouvernement du Canada peut vous venir en aide. Visitez le  <a href="www.cibletudes.ca" target="_blank">www.cibletudes.ca</a> ou communiquez avec le Centre de service national de prêts aux étudiants (CSNPE) pour obtenir de plus amples renseignements sur les modalités de remboursement.</p>'
          },
          {
            question: 'Comment puis-je communiquer avec le Centre de service national de prêts aux étudiants (CSNPE)?',
            answer: '<p>Centre de service national de prêts aux étudiants (CSNPE)<br/>Téléphone : 888-815-4514 (en Amérique du Nord); ATS : 888-815-4556</br>800-2-225-2501 (de l’extérieur de l’Amérique du Nord)</p><p>Visitez le <a href="www.cibletudes.ca" target="_blank">www.cibletudes.ca</a> pour accéder au site Web du CSNPE.</p>'
          }
        ]
      }
    }
  }
}
</script>






