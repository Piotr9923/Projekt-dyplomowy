package com.piotr.aplikacjaserwiskomputerowy.client;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.piotr.aplikacjaserwiskomputerowy.R;
import com.piotr.aplikacjaserwiskomputerowy.model.Announcement;
import com.piotr.aplikacjaserwiskomputerowy.model.ComputerCrash;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ComputerCrashList extends AppCompatActivity {

    private ListView listView;
    private ComputerCrashListAdapter adapter;
    private List<ComputerCrash> list;

    @Override
    public void onBackPressed() {
        DialogInterface.OnClickListener dialogClickListener = new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                switch (which) {
                    case DialogInterface.BUTTON_POSITIVE:
                        ComputerCrashList.super.onBackPressed();
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
        setContentView(R.layout.activity_computer_crash_list);

        BottomNavigationView navigationView = findViewById(R.id.bottom_navigation);
        navigationView.setSelectedItemId(R.id.page_2);
        navigationView.setOnNavigationItemSelectedListener(NavListener.getNavListener(this,this));

        listView = (ListView) findViewById(R.id.crash_list);

        list = new ArrayList<>();

        loadCrashes();

    }

    private void loadCrashes(){
        String url = getString(R.string.serverUrl) + "/client/crash";

        RequestQueue queue = Volley.newRequestQueue(ComputerCrashList.this);

        JsonArrayRequest request = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {

                for(int i=0;i<response.length();i++){
                    try {
                        JSONObject object = response.getJSONObject(i);
                        list.add(new ComputerCrash(object.getInt("id"),object.getString("title"),object.getString("status"),object.getString("type"),object.getString("date"),object.getDouble("cost")));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                showCrashes();

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

                Toast.makeText(ComputerCrashList.this,"Nie można pobrać awarii!",Toast.LENGTH_SHORT);

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

    private void showCrashes(){
        adapter = new ComputerCrashListAdapter(getApplicationContext(), list);

        listView.setAdapter(adapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(ComputerCrashList.this,CrashView.class);
                intent.putExtra("url",(String)view.getTag());
                startActivity(intent);
            }
        });
    }
}
