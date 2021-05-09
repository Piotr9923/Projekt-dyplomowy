package com.piotr.aplikacjaserwiskomputerowy.client;

import android.content.Context;
import android.content.Intent;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.piotr.aplikacjaserwiskomputerowy.R;

public class NavListener {


    public static BottomNavigationView.OnNavigationItemSelectedListener getNavListener(final Context context, final AppCompatActivity activity){

        BottomNavigationView.OnNavigationItemSelectedListener navListener = new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                Intent intent = null;
                switch (menuItem.getItemId()){
                    case R.id.page_1:
                        intent = new Intent(context,ClientDashboard.class);
                        activity.startActivity(intent);
                        activity.finish();
                        break;
                    case R.id.page_2:
                        System.out.println("2222222222222");
                        break;
                    case R.id.page_3:
                        intent = new Intent(context,AddHomeCrash.class);
                        activity.startActivity(intent);
                        activity.finish();
                        break;
                }
                return true;
            }
        };
        return navListener;
    }
}
