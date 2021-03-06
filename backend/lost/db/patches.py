import lost
from lost.logic.file_man import FileMan
from lost.logic.config import LOSTConfig
import os
import json

def update_version_log():
    fm = FileMan(LOSTConfig())
    path = fm.get_version_log_path()
    if not os.path.exists(path):
        print('Patchsystem: Created version log file: {}'.format(path))
        versions = []
        versions.append(lost.__version__)
        with open(path, 'w') as json_file:
            json.dump(versions, json_file)
    else:
        with open(path) as json_file:  
            versions = json.load(json_file)
        if versions[-1] == lost.__version__:
            print('Patchsystem: No version change!')
        else:
            print('Patchsystem: We maybe need to patch!')


