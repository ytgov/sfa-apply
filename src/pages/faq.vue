<template>
  <v-container fluid>
    <Faq :faqs="faqs" />
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
  data() {
    return {
      faqs: [
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
      ]
    }
  }
}
</script>






