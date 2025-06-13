-- 创建服装表
CREATE TABLE clothes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category_name TEXT,
  category TEXT,
  image_url TEXT,
  purchase_date DATE,
  price DECIMAL(10, 2),
  purchase_link TEXT,
  washing_method TEXT,
  status TEXT DEFAULT '已购买' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 创建索引
CREATE INDEX idx_clothes_user_id ON clothes(user_id);
CREATE INDEX idx_clothes_category ON clothes(category);
CREATE INDEX idx_clothes_status ON clothes(status);