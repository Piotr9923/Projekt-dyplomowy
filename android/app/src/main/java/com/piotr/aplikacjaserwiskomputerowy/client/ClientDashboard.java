package com.piotr.aplikacjaserwiskomputerowy.client;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import com.piotr.aplikacjaserwiskomputerowy.R;
import com.piotr.aplikacjaserwiskomputerowy.model.Announcement;

import java.util.ArrayList;
import java.util.List;

public class ClientDashboard extends AppCompatActivity {

    private ListView listView;
    private AnnouncementListAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_client_dashboard);

        listView = (ListView) findViewById(R.id.announcement_client_list);


        List<Announcement> list = new ArrayList<>();
        list.add(new Announcement(1,"2021-10-13","Ogłoszenie testowe","adad"));
        list.add(new Announcement(10,"2021-3-45","adsssssssssssssssssssss","adad"));
        list.add(new Announcement(1112,"2021-2-33","dassssssssssssssssssssssssssssss","adad"));
        list.add(new Announcement(1,"2021-10-13","Ogłoszenie testowe","adad"));
        list.add(new Announcement(10,"2021-3-45","adsssssssssssssssssssss","adad"));
        list.add(new Announcement(1112,"2021-2-33","dassssssssssssssssssssssssssssss","adad"));
        list.add(new Announcement(1,"2021-10-13","Ogłoszenie testowe","adad"));
        list.add(new Announcement(10,"2021-3-45","adsssssssssssssssssssss","adad"));
        list.add(new Announcement(1112,"2021-2-33","dassssssssssssssssssssssssssssss","adad"));
        list.add(new Announcement(1,"2021-10-13","Ogłoszenie testowe","adad"));
        list.add(new Announcement(10,"2021-3-45","adsssssssssssssssssssss","adad"));
        list.add(new Announcement(1112,"2021-2-33","dassssssssssssssssssssssssssssss","adad"));
        list.add(new Announcement(1,"2021-10-13","Ogłoszenie testowe","adad"));
        list.add(new Announcement(10,"2021-3-45","adsssssssssssssssssssss","adad"));
        list.add(new Announcement(1112,"2021-2-33","dassssssssssssssssssssssssssssss","adad"));
        list.add(new Announcement(1,"2021-10-13","Ogłoszenie testowe","adad"));
        list.add(new Announcement(10,"2021-3-45","adsssssssssssssssssssss","adad"));
        list.add(new Announcement(1112,"2021-2-33","dassssssssssssssssssssssssssssss","adad"));
        list.add(new Announcement(1,"2021-10-13","Ogłoszenie testowe","adad"));
        list.add(new Announcement(10,"2021-3-45","adsssssssssssssssssssss","adad"));
        list.add(new Announcement(1112,"2021-2-33","dassssssssssssssssssssssssssssss","adad"));

        adapter = new AnnouncementListAdapter(getApplicationContext(), list);

        listView.setAdapter(adapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Toast.makeText(getApplicationContext(),"Klinięto id "+view.getTag(),Toast.LENGTH_SHORT).show();
            }
        });

    }
}
