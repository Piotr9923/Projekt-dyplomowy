package com.piotr.aplikacjaserwiskomputerowy;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.se.omapi.Session;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.NoConnectionError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.TimeoutError;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.piotr.aplikacjaserwiskomputerowy.client.ClientDashboard;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.net.ssl.HttpsURLConnection;

public class LoginActivity extends Activity {


    EditText usernameTF, passwordTF;
    Button login;

    private String username, password;
    private String url;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        usernameTF = this.findViewById(R.id.username);
        passwordTF = this.findViewById(R.id.password);
        login = this.findViewById(R.id.loginButton);

        url = getString(R.string.serverUrl) + "/signin";

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                username = usernameTF.getText().toString();
                password = passwordTF.getText().toString();


                Map<String,String> params = new HashMap();
                params.put("username",username);
                params.put("password",password);

                JSONObject parameters = new JSONObject(params);

                RequestQueue queue = Volley.newRequestQueue(LoginActivity.this);

                JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url,parameters,
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {

                                String token = "Bearer ";
                                JSONArray roles = null;
                                try {
                                    token = token + response.getString("token");
                                    roles = response.getJSONArray("roles");
                                } catch (JSONException e) {


                                }
                                Set<String> rolesSet = new HashSet();

                                boolean isClient = false;

                                for(int i=0;i<roles.length();i++){
                                    try {
                                        rolesSet.add(roles.getString(i));
                                        if(roles.getString(i).equals("CLIENT")) isClient = true;
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }
                                }

                                if(isClient) {

                                    SharedPreferences preferences = getSharedPreferences("session", MODE_PRIVATE);
                                    SharedPreferences.Editor edit = preferences.edit();
                                    edit.putString("token", token);
                                    edit.putStringSet("roles", rolesSet);
                                    edit.commit();

                                    Intent intent = new Intent(LoginActivity.this, ClientDashboard.class);
                                    startActivity(intent);
                                    finish();
                                }
                                else{
                                    new AlertDialog.Builder(LoginActivity.this)
                                            .setTitle("Nie jesteś klientem serwisu!")
                                            .setMessage("").show();
                                }
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                        System.out.println(error);
                        if (error instanceof AuthFailureError) {
                            new AlertDialog.Builder(LoginActivity.this)
                                    .setTitle("Błędne dane logowania!")
                                    .setMessage("").show();
                        }
                        else{
                            new AlertDialog.Builder(LoginActivity.this)
                                    .setTitle("Wystąpił błąd! Spróbuj ponownie później!")
                                    .setMessage("").show();
                        }
                    }
                });

                queue.add(request);

            }
        });
    }
}
