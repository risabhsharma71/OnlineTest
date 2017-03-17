import Ember from 'ember';

import CONFIG from 'online-test/config/environment';


import {
    validator,
    buildValidations
} from 'ember-cp-validations';

var Validations = buildValidations({
    email: [
        validator('presence', true),
        validator('format', {
            type: 'email'
        })
    ],
  
});

export default Ember.Controller.extend(Validations, {
    isShowingModal: false,
 
    actions: {
        register: function() {
            this.transitionToRoute('register');
        },
        
        login: function() {
            let {
                email,
                password 
            } = this.getProperties('email', 'password');

            var dataString = {
                "email": email,
                "password": password,
            };
            console.log(CONFIG.GOURL);
            this.toggleProperty('isShowingModal');
            this.set('loading_image_visibility', "show");
            var mycontroller = this;
            var uid,fname,token,usertype;
            return $.ajax({
            url: CONFIG.GOURL+'/login',
            type: 'POST',
            accepts: 'application/json',
            data: JSON.stringify(dataString),
            success: function(response) {
                   console.log(JSON.stringify(response));
                   uid = response.uid;
                   fname=response.fname;
                   token=response.token;
                   usertype=response.usertype;
                   mycontroller.set('uid',uid);
                   mycontroller.set('uid',fname);
                   mycontroller.set('uid',token);
                   mycontroller.set('uid',usertype);
                   mycontroller.toggleProperty('isShowingModal');
                   mycontroller.set('loading_image_visibility', "hide");
                   mycontroller.transitionToRoute('test');              
                  
            },
            error: function(result) {
                   console.log('DEBUG: GET Enquiries Failed');
            }
           });
        }
            
    }
});