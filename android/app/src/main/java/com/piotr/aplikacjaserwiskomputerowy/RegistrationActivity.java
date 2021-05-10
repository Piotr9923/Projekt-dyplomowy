package com.piotr.aplikacjaserwiskomputerowy;

import androidx.annotation.ColorInt;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;

import com.android.volley.AuthFailureError;
import com.android.volley.ClientError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.piotr.aplikacjaserwiskomputerowy.R;
import com.piotr.aplikacjaserwiskomputerowy.client.AddHomeCrash;
import com.piotr.aplikacjaserwiskomputerowy.client.ComputerCrashList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

public class RegistrationActivity extends AppCompatActivity {

    private EditText firstname, lastname, phoneNumber, email, username, password, password2;
    private Button registrationButton, newClientButton, existsClientButton;
    private boolean isNewClient = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        firstname = findViewById(R.id.client_registration_firstname);
        lastname = findViewById(R.id.client_registration_lastname);
        phoneNumber = findViewById(R.id.client_registration_phone_number);
        email = findViewById(R.id.client_registration_mail);
        username = findViewById(R.id.client_registration_username);
        password = findViewById(R.id.client_registration_password);
        password2 = findViewById(R.id.client_registration_password2);
        registrationButton = findViewById(R.id.registration_button);
        newClientButton = findViewById(R.id.new_client);
        existsClientButton = findViewById(R.id.exists_client);

        newClientButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                newClientButton.setBackgroundColor(Color.rgb(230,230,250));
                existsClientButton.setBackgroundColor(Color.rgb(255,255,255));
                isNewClient = true;

                updateFormView();
            }
        });

        existsClientButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                existsClientButton.setBackgroundColor(Color.rgb(230,230,250));
                newClientButton.setBackgroundColor(Color.rgb(255,255,255));
                isNewClient = false;

                updateFormView();
            }
        });

        registrationButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(arePasswordsSame()) {
                    register();
                }
                else{
                    new AlertDialog.Builder(RegistrationActivity.this)
                            .setTitle("Hasła nie są takie same!")
                            .setMessage("").show();
                }
            }
        });
    }

    private void updateFormView(){

        if(isNewClient){
            firstname.setVisibility(View.VISIBLE);
            lastname.setVisibility(View.VISIBLE);
            phoneNumber.setVisibility(View.VISIBLE);

            email.setHint("Adres e-mail");


            RelativeLayout.LayoutParams params = (RelativeLayout.LayoutParams) email.getLayoutParams();
            params.addRule(RelativeLayout.BELOW, R.id.client_registration_phone_number);
        }
        else{
            firstname.setVisibility(View.GONE);
            lastname.setVisibility(View.GONE);
            phoneNumber.setVisibility(View.GONE);

            email.setHint("Kontaktowy adres e-mail");

            RelativeLayout.LayoutParams params = (RelativeLayout.LayoutParams) email.getLayoutParams();
            params.addRule(RelativeLayout.BELOW, R.id.choose_registration_mode_window);
        }

    }

    private boolean arePasswordsSame(){
        return password.getText().toString().equals(password2.getText().toString());
    }

    private void register(){

        String url = getString(R.string.serverUrl) + "/signup";

        if(!isNewClient){
            url = getString(R.string.serverUrl) + "/client_signup";
        }

        Map<String,String> params = new HashMap();
        params.put("username",username.getText().toString());
        params.put("password",password.getText().toString());
        params.put("email",email.getText().toString());

        if(isNewClient){
            params.put("phoneNumber",phoneNumber.getText().toString());
            params.put("firstname",firstname.getText().toString());
            params.put("lastname",lastname.getText().toString());
        }

        JSONObject parameters = new JSONObject(params);
        RequestQueue queue = Volley.newRequestQueue(RegistrationActivity.this);


        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url,parameters,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {

                        new AlertDialog.Builder(RegistrationActivity.this)
                                .setTitle("Poprawnie zarejestrowano!")
                                .setMessage("").show();
                        Intent intent = new Intent(RegistrationActivity.this, LoginActivity.class);
                        startActivity(intent);
                        finish();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                if(error instanceof ClientError){
                    JSONObject response = null;
                    JSONArray errors = null;
                    try {
                        response = new JSONObject(new String(error.networkResponse.data));
                        errors = response.getJSONArray("errors");
                    } catch (JSONException e) {

                        new AlertDialog.Builder(RegistrationActivity.this)
                                .setTitle("Wystąpił błąd! Spróbuj ponownie później!")
                                .setMessage("").show();
                    }
                    String message = "";
                    for(int i=0;i<errors.length();i++){
                        try {
                            message = message + errors.getString(i)+"\n";
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    new AlertDialog.Builder(RegistrationActivity.this)
                            .setTitle("Błędnie uzupełnione pola!")
                            .setMessage(message).show();
                }
                else{
                    new AlertDialog.Builder(RegistrationActivity.this)
                            .setTitle("Wystąpił błąd! Spróbuj ponownie później!")
                            .setMessage("").show();
                }
            }
        }){
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            protected Response<JSONObject> parseNetworkResponse(NetworkResponse response) {
                try {
                    if (response.data.length == 0) {
                        byte[] responseData = "{}".getBytes("UTF8");
                        response = new NetworkResponse(response.statusCode, responseData, response.headers, response.notModified);
                    }
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                return super.parseNetworkResponse(response);
            }

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<String, String>();
                SharedPreferences preferences = getSharedPreferences("session",MODE_PRIVATE);
                String token = preferences.getString("token","");
                headers.put("Authorization", token);
                return headers;
            }
        };;

        queue.add(request);

    }
}
