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
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.piotr.aplikacjaserwiskomputerowy.R;
import com.piotr.aplikacjaserwiskomputerowy.model.Announcement;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class AnnouncementView extends AppCompatActivity {

    private TextView titleTV, textTV, dateTV;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_announcement_view);

        BottomNavigationView navigationView = findViewById(R.id.bottom_navigation);
        navigationView.setSelectedItemId(R.id.page_1);
        navigationView.setOnNavigationItemSelectedListener(NavListener.getNavListener(this,this));

        Intent myIntent = getIntent();

        int id = myIntent.getIntExtra("id",-1);


        titleTV = findViewById(R.id.announcement_title);
        textTV = findViewById(R.id.announcement_text);
        dateTV = findViewById(R.id.announcement_date);

        loadAnnouncement(id);

    }

    private void loadAnnouncement(int id){

        String url = getString(R.string.serverUrl) + "/client/announcement/"+id;

        RequestQueue queue = Volley.newRequestQueue(AnnouncementView.this);

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {

                String title = "";
                String text = "";
                String date = "";

                try {
                    title = response.getString("title");
                    text = response.getString("text");
                    date = response.getString("date");
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                titleTV.setText(title);
                textTV.setText(text);
                dateTV.setText("Opublikowano dnia: " + date);

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

                Toast.makeText(AnnouncementView.this,"Nie można pobrać ogłoszenia!",Toast.LENGTH_SHORT);

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
