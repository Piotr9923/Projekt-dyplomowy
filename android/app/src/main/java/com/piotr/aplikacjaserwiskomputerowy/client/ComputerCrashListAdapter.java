package com.piotr.aplikacjaserwiskomputerowy.client;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.piotr.aplikacjaserwiskomputerowy.R;
import com.piotr.aplikacjaserwiskomputerowy.model.ComputerCrash;

import java.util.List;

public class ComputerCrashListAdapter extends BaseAdapter{

    private Context mContext;
    private List<ComputerCrash> crashList;

    public ComputerCrashListAdapter(Context mContext, List<ComputerCrash> crashList) {
        this.mContext = mContext;
        this.crashList = crashList;
    }

    @Override
    public int getCount() {
        return crashList.size();
    }

    @Override
    public Object getItem(int position) {
        return crashList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View v = View.inflate(mContext, R.layout.computer_crash_list_element,null);

        TextView date = (TextView) v.findViewById(R.id.date);
        TextView title = (TextView) v.findViewById(R.id.crash_list_title);
        TextView type = (TextView) v.findViewById(R.id.type);
        TextView status = (TextView) v.findViewById(R.id.status);

        date.setText(crashList.get(position).getDate());
        title.setText(crashList.get(position).getTitle());
        status.setText(crashList.get(position).getStatus());
        if(crashList.get(position).getType().equals("HOME")){
            type.setText("Awaria domowa");
        }
        else{
            type.setText("Serwis");
        }

        String url = "/client/";

        if(crashList.get(position).getType().equals("HOME")){
            url = url + "home_crash/";
        }
        else{
            url = url + "crash/";
        }
        url = url + crashList.get(position).getId();

        v.setTag(url);
        return v;
    }
}


