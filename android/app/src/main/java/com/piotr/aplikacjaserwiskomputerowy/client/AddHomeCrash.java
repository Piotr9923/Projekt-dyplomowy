package com.piotr.aplikacjaserwiskomputerowy.client;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.Spinner;

import com.android.volley.AuthFailureError;
import com.android.volley.ClientError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.piotr.aplikacjaserwiskomputerowy.LoginActivity;
import com.piotr.aplikacjaserwiskomputerowy.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class AddHomeCrash extends AppCompatActivity {

    private EditText description, city, code, street, userTitle;
    private Spinner title;
    private Button sendCrashButton;

    @Override
    public void onBackPressed() {
        DialogInterface.OnClickListener dialogClickListener = new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                switch (which) {
                    case DialogInterface.BUTTON_POSITIVE:
                        AddHomeCrash.super.onBackPressed();
                        break;

                    case DialogInterface.BUTTON_NEGATIVE:
                        break;
                }
            }
        };

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setMessage("Napewno chcesz się wylogować?").setPositiveButton("Tak", dialogClickListener)
                .setNegativeButton("Nie", dialogClickListener).show();

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_home_crash);

        BottomNavigationView navigationView = findViewById(R.id.bottom_navigation);
        navigationView.setSelectedItemId(R.id.page_3);
        navigationView.setOnNavigationItemSelectedListener(NavListener.getNavListener(this,this));

        String url = getString(R.string.serverUrl) + "/client/announcement";

        title = findViewById(R.id.crash_title);
        description = findViewById(R.id.crash_description);
        city = findViewById(R.id.crash_city);
        street = findViewById(R.id.crash_street);
        code = findViewById(R.id.crash_code);
        userTitle = findViewById(R.id.user_crash_title);
        sendCrashButton = findViewById(R.id.send_crash);

        userTitle.setVisibility(View.GONE);

        title.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String selected = (String) parent.getItemAtPosition(position);

                if(selected.equals("Inne")){
                    userTitle.setVisibility(View.VISIBLE);
                    RelativeLayout.LayoutParams params = (RelativeLayout.LayoutParams) description.getLayoutParams();
                    params.addRule(RelativeLayout.BELOW, R.id.user_crash_title);
                }
                else{
                    userTitle.setVisibility(View.GONE);
                    RelativeLayout.LayoutParams params = (RelativeLayout.LayoutParams) description.getLayoutParams();
                    params.addRule(RelativeLayout.BELOW, R.id.crash_title);
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });


        sendCrashButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendCrash();
            }
        });
    }

    private void sendCrash(){

        String url = getString(R.string.serverUrl) + "/client/home_crash";

        Map<String,String> params = new HashMap();
        params.put("description",description.getText().toString());
        params.put("street",street.getText().toString());
        params.put("code",code.getText().toString());
        params.put("city",code.getText().toString());
        if(title.getSelectedItem().toString().equals("Inne")){
            params.put("title",userTitle.getText().toString());
        }
        else{
            params.put("title",title.getSelectedItem().toString());
        }

        JSONObject parameters = new JSONObject(params);

        RequestQueue queue = Volley.newRequestQueue(AddHomeCrash.this);

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url,parameters,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {

                        new AlertDialog.Builder(AddHomeCrash.this)
                                .setTitle("Poprawnie zgłoszono awarię!")
                                .setMessage("").show();
                        Intent intent = new Intent(AddHomeCrash.this,ClientDashboard.class);
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
                        new AlertDialog.Builder(AddHomeCrash.this)
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
                    new AlertDialog.Builder(AddHomeCrash.this)
                            .setTitle("Błędnie uzupełnione pola!")
                            .setMessage(message).show();

                }
                else{
                    new AlertDialog.Builder(AddHomeCrash.this)
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
