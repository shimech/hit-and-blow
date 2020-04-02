import os


class Utils:
    @staticmethod
    def make_dir(base_dir, dir_name):
        dir_path = os.path.join(base_dir, dir_name)
        if os.path.isdir(dir_path):
            print("PATH: {} はすでに存在します。".format(dir_path))
        else:
            os.makedirs(dir_path)
            print("PATH: {} を作成しました。".format(dir_path))
        return dir_path
