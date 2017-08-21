import {Component, OnInit} from '@angular/core';

declare var recurly: any;
declare var jQuery: any;

// When a customer hits their 'enter' key while in a field
recurly.on('field:submit', function (event) {
  jQuery('form').submit();
});


// A simple error handling function to expose errors to the customer
function error(err) {
  jQuery('#errors').text('The following fields appear to be invalid: ' + err.fields.join(', '));
  jQuery('button').prop('disabled', false);
  jQuery.each(err.fields, function (i, field) {
    jQuery('[data-recurly=' + field + ']').addClass('error');
  });
}

@Component({
  selector: 'app-recurly-form',
  templateUrl: './recurly-form.component.html',
  styleUrls: ['./recurly-form.component.scss']
})
export class RecurlyFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // Configure recurly.js
    recurly.configure({
      publicKey: 'YOUR-TOKEN',
      style: {
        all: {
          fontFamily: 'Open Sans',
          fontSize: '1rem',
          fontWeight: 'bold',
          fontColor: '#2c0730'
        },
        number: {
          placeholder: ''
        },
        month: {
          placeholder: 'mm'
        },
        year: {
          placeholder: 'yy'
        }
      }
    });

    // On form submit, we stop submission to go get the token
    jQuery('form').on('submit', function (event) {

      // Prevent the form from submitting while we retrieve the token from Recurly
      event.preventDefault();

      // Reset the errors display
      jQuery('#errors').text('');
      jQuery('input').removeClass('error');

      // Disable the submit button
      jQuery('button').prop('disabled', true);

      const form = this;

      // Now we call recurly.token with the form. It goes to Recurly servers
      // to tokenize the credit card information, then injects the token into the
      // data-recurly="token" field above
      recurly.token(form, function (err, token) {

        // send any errors to the error function below
        if (err) {
          error(err);

          // Otherwise we continue with the form submission
        } else { // form.submit();
          if (token && token.id) {
            alert('The token is: ' + token.id);
          }
        }
      });
    });
  }

}
