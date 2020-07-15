INSERT INTO SystemUser (Login, Password) VALUES
  ('admin', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$XcD5Zfk+BVIGEyiksBjjy9LL42AFOOqlhEB650woECs$3CNOs25gOVV8AZMYQc6bFnrYdM+3xP996shxJEq5LxGt4gs1g9cocZmi/SYg/H16egY4j7qxTD/oygyEI80cgg'),
  ('user', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$z5uf2xGdpgq5v2sZbgh36QoZG9CDmGmJUNJkrs1zs2w$3s3x22k4Td0jkup4WduFQGFVjrFKHjN1WV9k8/Bh3DKI58Wrlo/D4Js9j/DiskwI8rltDd8pF15JylivFu2T0g');

-- Examples login/password
-- admin/123456
-- user/nopassword

INSERT INTO SystemGroup (Name) VALUES
  ('admins'),
  ('users'),
  ('guests');

INSERT INTO GroupUser (GroupId, UserId) VALUES
  (1, 1),
  (2, 2);
