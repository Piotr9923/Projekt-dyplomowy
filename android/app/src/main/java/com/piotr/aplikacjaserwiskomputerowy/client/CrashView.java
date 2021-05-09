package com.piotr.aplikacjaserwiskomputerowy.client;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.piotr.aplikacjaserwiskomputerowy.R;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class CrashView extends AppCompatActivity {

    private TextView titleTV, statusTV, dateTV, costTV, messageTV, descriptionTV;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_crash_view);

        BottomNavigationView navigationView = findViewById(R.id.bottom_navigation);
        navigationView.setSelectedItemId(R.id.page_2);
        navigationView.setOnNavigationItemSelectedListener(NavListener.getNavListener(this,this));

        Intent myIntent = getIntent();

        String url = myIntent.getStringExtra("url");

        titleTV = findViewById(R.id.crash_view_title);
        statusTV = findViewById(R.id.crash_view_status);
        dateTV = findViewById(R.id.crash_view_date);
        costTV = findViewById(R.id.crash_view_cost);
        messageTV = findViewById(R.id.crash_view_message);
        descriptionTV = findViewById(R.id.crash_view_description);

        loadCrashInfo(url);
    }

    private void loadCrashInfo(String url){

        url = getString(R.string.serverUrl) + url;

        RequestQueue queue = Volley.newRequestQueue(CrashView.this);

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {

                String title = "";
                String date = "";
                String description = "";
                String message = "";
                String status = "";
                double cost = 0.0;

                try {
                    title = response.getString("title");
                    description = response.getString("description");
                    date = response.getString("date");
                    status = response.getString("status");
                    message = response.getString("crashMessage");
                    cost = response.getDouble("cost");

                } catch (JSONException e) {
                    e.printStackTrace();
                }

                titleTV.setText(title);
                dateTV.setText("Data zgłoszenia: " + date);
                statusTV.setText("Status zgłoszenia: "+status);
                descriptionTV.setText(description);
                messageTV.setText(message);

                if(cost>0){
                    costTV.setText("Do zapłaty "+cost+" zł");
                }

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

                Toast.makeText(CrashView.this,"Nie można pobrać infromacji o awarii!",Toast.LENGTH_SHORT);

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
        };
        queue.add(request);


    }
}
