package com.piotr.aplikacjaserwiskomputerowy.client;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.piotr.aplikacjaserwiskomputerowy.R;
import com.piotr.aplikacjaserwiskomputerowy.model.Announcement;

import java.util.List;

public class AnnouncementListAdapter extends BaseAdapter {

    private Context mContext;
    private List<Announcement> announcementList;

    public AnnouncementListAdapter(Context mContext, List<Announcement> announcementList) {
        this.mContext = mContext;
        this.announcementList = announcementList;
    }

    @Override
    public int getCount() {
        return announcementList.size();
    }

    @Override
    public Object getItem(int position) {
        return announcementList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View v = View.inflate(mContext, R.layout.announcement_list_element,null);

        TextView date = (TextView) v.findViewById(R.id.date);
        TextView title = (TextView) v.findViewById(R.id.announcement_title);

        date.setText(announcementList.get(position).getDate());
        title.setText(announcementList.get(position).getTitle());

        v.setTag(announcementList.get(position).getId());

        return v;
    }
}
