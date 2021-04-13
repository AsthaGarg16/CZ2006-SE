import json
import copy
obj={}
data=[]
with open('C:\Github_projects\CZ2006-SE\db thing\exam2020.txt') as json_file:
    f = json.load(json_file)

    for p in f:

        obj["courseCode"]=p
        obj["date"]=f[p]["date"]
        obj["day"]=f[p]["day"]
        time=f[p]["time"]
        if(time[-2:]=='am'):
            
            t2=time[0:-3].split('.')
            
            if(int(t2[0])<10):
                t='0'+t2[0]+t2[1]
            else:
                t=t2[0]+t2[1]
        else:
            t2=time[0:-3].split('.')
            t1=(int(t2[0])+12)
            t=str(t1) + t2[1]
        print(t)
        obj["time"]=t
        duration = f[p]["duration"]
        if(duration[-2:] == 'hr'):
            dur2 = int(duration[0])*60
        else:
            dur2 = int(duration[0])*60 + int(duration[5:7])
        print(dur2)
        obj["duration"] = dur2
        data.append(copy.copy(obj))
        print(data)
with open('C:\Github_projects\CZ2006-SE\db thing\examUpdate1.txt', 'w') as outfile:
    json.dump(data, outfile)    
