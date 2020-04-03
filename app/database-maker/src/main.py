import os
import sys
import itertools
import json
from utils import Utils

FILE_PATH = os.path.abspath(__file__)
NUMS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
DEFAULT_LENGTH = 4


def main():
    length = int(sys.argv[1]) if len(sys.argv) >= 2 else DEFAULT_LENGTH

    db_dir_path = Utils.make_dir(
        os.path.dirname(os.path.dirname(FILE_PATH)), "db")

    candidates = generate_candidates(length)

    database = []
    for c in candidates:
        database.append({
            "value": "".join(c),
            "isRemain": True
        })

    json_path = os.path.join(
        db_dir_path, "candidates_len{}.json".format(length))
    with open(json_path, mode="w") as f:
        json.dump(database, f, ensure_ascii=False, indent=2)

    print("JSON: {} を出力しました。".format(json_path))


def generate_candidates(length):
    return list(itertools.combinations(NUMS, length))


if __name__ == "__main__":
    main()
