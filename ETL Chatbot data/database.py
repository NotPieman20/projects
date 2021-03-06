import sqlite3
import json
from datetime import datetime
import time
import random

then = time.time()

timeframe = '2015-091'
sql_transaction = []
start_row = 0
cleanup = 1000000


connection = sqlite3.connect('{}.db'.format(timeframe))
cur = connection.cursor()

def create_table():
    cur.execute("CREATE TABLE IF NOT EXISTS parent_reply(parent_id TEXT PRIMARY KEY, comment_id TEXT UNIQUE, parent TEXT, comment TEXT, subreddit TEXT, unix INT, score INT)")

def format_data(data):
    data = data.replace('\n',' newlinechar ').replace('\r',' newlinechar ').replace('"',"'")
    return data

def find_existing_score(pid):
   try:
    sql = "SELECT score FROM parent_reply WHERE parent_id = '{}' LIMIT 1".format(pid)
    cur.execute(sql)
    result = cur.fetchone()
    if result != None:
        return result[0]
    else:
        return False
   except Exception as e:
        #print(str(e))
        return False
#used to weed unacceptable comments that are not too long or are removed or deleted
def acceptable(data):
    if len(data.split(' ')) > 50 or len(data) < 1:
        return False
    elif len(data) > 1000:
        return False
    elif data == '[deleted]':
        return False
    elif data == '[removed]':
        return False
    else:
        return True
# sql statement here was one problem with why data was not being paired.
def find_parent(pid):
   try:
    sql = "SELECT comment FROM parent_reply WHERE comment_id = '{}' LIMIT 1".format(pid)
    cur.execute(sql)
    result = cur.fetchone()
    if result != None:
        return result[0]
    else:
        return False
   except Exception as e:
        #print(str(e))
        return False
    
def transaction_bldr(sql):
    global sql_transaction
    sql_transaction.append(sql)
    if len(sql_transaction) > 1000:
        cur.execute('BEGIN TRANSACTION')
        for s in sql_transaction:
            try:
                cur.execute(s)
            except:
                pass
        connection.commit()
        sql_transaction = []
         
    
# This sql insert might cause problems
def sql_insert_replace_comment(commentid,parentid,parent,comment,subreddit,time,score):
    try:
        sql = """UPDATE parent_reply SET parent_id = ?, comment_id = ?, parent = ?, comment = ?, subreddit = ?, unix = ?, score = ? WHERE parent_id =?;""".format(parentid, commentid, parent, comment, subreddit, int(time), score, parentid)
        transaction_bldr(sql)
    except Exception as e:
        print('s-UPDATE insertion',str(e))

def sql_insert_has_parent(commentid,parentid,parent,comment,subreddit,time,score):
    try:
        sql = """INSERT INTO parent_reply (parent_id, comment_id, parent, comment, subreddit, unix, score) VALUES ("{}","{}","{}","{}","{}",{},{});""".format(parentid, commentid, parent, comment, subreddit, int(time), score)
        transaction_bldr(sql)
    except Exception as e:
        print('s-PARENT insertion',str(e))

def sql_insert_no_parent(commentid,parentid,comment,subreddit,time,score):
    try:
        sql = """INSERT INTO parent_reply (parent_id, comment_id, comment, subreddit, unix, score) VALUES ("{}","{}","{}","{}",{},{});""".format(parentid, commentid, comment, subreddit, int(time), score)
        transaction_bldr(sql)
    except Exception as e:
        print('s-NO_PARENT insertion',str(e))
        

if __name__ == "__main__":
    create_table()
    row_counter = 0 #how many rows have been iterated through
    paired_rows = 0 #comments with a paired reply, some commnets have no replies
    
    with open('C:/Users/piema/Documents/RC_{}-01'.format(timeframe.split('-')[0],timeframe),buffering=1000) as f:
        for row in f:
            #print(row) use print row to here to see if you have successfully loaded in the data
            
            row_counter +=1
            row = json.loads(row)
            parent_id = row['parent_id']
            body = format_data(row['body'])
            created_utc = row['created_utc']
            score = row['score']
            comment_id = row['name']
            subreddit = row['subreddit']
            parent_data = find_parent(parent_id)
            
            #if the score is greater and the comment is acceptable, do this
            if row_counter > start_row:
                try:
                    existing_comment_score = find_existing_score(parent_id)
                    if existing_comment_score:
                            if score > existing_comment_score:
                                sql_insert_replace_comment(comment_id, parent_id, parent_data, body, subreddit, created_utc, score)
                    
                    else:
                        if acceptable(body):
                            if parent_data:
                                sql_insert_has_parent(comment_id, parent_id, parent_data, body, subreddit, created_utc, score)
                                paired_rows += 1
                            else:
                                sql_insert_no_parent(comment_id, parent_id, body, subreddit, created_utc, score)
                except Exception as e:
                    print(str(e))
    
            if row_counter % 100000 == 0:
                now = time.time()
                print('Total Rows Read: {}, Paired Rows: {}, Time: {}'.format(row_counter, paired_rows, str(datetime.now())))
                print("It took: ", float(str(round(now-then, 2))), " seconds")
                
            if row_counter % cleanup == 0:
                print("Cleanin up!")
                sql = "DELETE FROM parent_reply WHERE parent IS NULL"
                cur.execute(sql)
                connection.commit()
                cur.execute("VACUUM")
                connection.commit()
                
                    
    
    
    
    
    
    
    
